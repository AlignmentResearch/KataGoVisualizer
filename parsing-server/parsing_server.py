import game_info
import os
import traceback
import urllib.request
import atexit
from timeit import default_timer as timer
from multiprocessing.connection import Listener
import pandas as pd
from pathlib import Path

mount_dir, read_dir = Path(os.environ['MOUNT_DIR']), Path(os.environ['READ_DIR'])

def load_and_parse_remote_file(url, fast_parse:bool=False):
    if not url:
        return None, pd.DataFrame()
    data = urllib.request.urlopen(url)
    raw_sgf_strs = [line.decode('utf-8') for line in data]
    parsed_dicts = [game_info.parse_game_str_to_dict(url, i, game, fast_parse=fast_parse) for i, game in enumerate(raw_sgf_strs)]
    return raw_sgf_strs, pd.DataFrame(parsed_dicts)

def load_and_parse_games(path, fast_parse:bool=False):
    if not path:
        return pd.DataFrame()
    container_path = mount_dir / Path(path).relative_to(read_dir)
    sgf_paths = game_info.find_sgf_files(container_path)
    print(f'Found {len(sgf_paths)} SGF files in {container_path}')
    parsed_dicts = game_info.read_and_parse_all_files(sgf_paths, fast_parse=fast_parse, processes=min(128, len(sgf_paths) // 2))
    return pd.DataFrame(parsed_dicts)

if __name__ == '__main__':
    listener = Listener(('parsing-server', 6536), authkey=b'secret password')

    def exit_handler():
        listener.close()
        print('Parsing server is terminating')

    atexit.register(exit_handler)

    print('Parsing server is running')

    while True:
        conn = listener.accept() # wait for a connection
        try:
            is_remote, data_source, fast_parse = conn.recv()
            print("Received request: %s" % data_source)

            start = timer()
            if is_remote:
                raw_sgf_strs, df = load_and_parse_remote_file(data_source, fast_parse=fast_parse)
                conn.send((None, raw_sgf_strs, df))
            else:
                df = load_and_parse_games(data_source, fast_parse=fast_parse)
                conn.send((None, None, df))
            end = timer()
            print(f'Sent reply with {len(df.index)} rows. Took {end-start} seconds')
        except (AssertionError, EOFError) as e:
            print('Failed to parse:', e)
            print(traceback.format_exc())
            conn.send((e, None, None))
        except Exception as e:
            print('Unknown error:', e)
            print(traceback.format_exc())
            conn.send((e, None, None))
        finally:
            conn.close()