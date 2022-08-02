import dtale
import pandas as pd

if __name__ == '__main__':
    print('Hello World')
    d = dtale.show(pd.DataFrame([1,2,3,4,5]), subprocess=False, app_root='/hello', hostname='localhost', port=40000)
    print('main_url', d._main_url)