# import zmq
import pandas as pd
import game_info
import urllib.request
import atexit
from timeit import default_timer as timer

# context = zmq.Context()
# socket = context.socket(zmq.REP)
# socket.bind("tcp://*:5555")
# # socket.bind("ipc:///tmp/zmq_socket")
from multiprocessing.connection import Listener


REMOTE_DATA_SOURCE, LOCAL_DATA_SOURCE = 'Remote', 'Local directory'

def load_and_parse_remote_file(url):
    if not url:
        return pd.DataFrame()
    data = urllib.request.urlopen(url)
    parsed_dicts = [game_info.parse_game_str_to_dict(line) for line in data]
    return pd.DataFrame(parsed_dicts)

def load_and_parse_games(path):
    sgf_paths = game_info.find_sgf_files(path)
    parsed_dicts = game_info.read_and_parse_all_files(sgf_paths)
    return pd.DataFrame(parsed_dicts)

# def exit_handler():
#     socket.close()
#     context.term()
#     print('Parsing server is terminating')

if __name__ == '__main__':
    listener = Listener(('localhost', 6536), authkey=b'secret password')

    def exit_handler():
        listener.close()
        print('Parsing server is terminating')

    atexit.register(exit_handler)

    while True:
        conn = listener.accept()
        print('connection accepted from', listener.last_accepted)
        #  Wait for next request from client
    #     data_source_type, data_source = socket.recv_pyobj()
        try:
            data_source_type, data_source = conn.recv()
            print("Received request: %s" % data_source)
        except EOFError:
            data_source_type, data_source = None, None
            print('Bad/empty request')

        start = timer()
        if data_source_type == REMOTE_DATA_SOURCE:
            df = load_and_parse_remote_file(data_source)
        else:
            df = load_and_parse_games(data_source)
        end = timer()

        #  Send reply back to client
        conn.send(df)
        # socket.send_pyobj(df)
        print(f'Sent reply with {len(df.index)} rows. Took {end-start} seconds')
        conn.close()