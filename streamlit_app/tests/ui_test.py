import pytest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

WEB_DRIVER_TIMEOUT = 10
END_OF_TEST_SLEEP = 0  # Useful for seeing the end state during dev
DEEP_LINK = "http://localhost:8501/?state=gASVQAAAAAAAAAB9lIwZdGJwYXJzZV9ldmVudF90eXBlc19zdGF0ZZRdlCiMB3NjYWxhcnOUjAVh%0AdWRpb5SMB2hwYXJhbXOUZXMu%0A"  # Encodes {'tbparse_event_types_state': ['scalars', 'audio', 'hparams']}


# --- Utils ---
def get_xpath(driver, xpath) -> webdriver.remote.webelement.WebElement:
    return WebDriverWait(driver, WEB_DRIVER_TIMEOUT).until(
        EC.presence_of_element_located((By.XPATH, xpath))
    )


def assert_xpath_exists(driver, xpath):
    try:
        get_xpath(driver, xpath)
    except TimeoutException:
        pytest.fail(f"Failed to find element with xpath {xpath}")


# --- Setup and Teardown ---
@pytest.fixture()
def drvr():
    driver = webdriver.Chrome()
    driver.get("http://localhost:8501")
    yield driver
    time.sleep(END_OF_TEST_SLEEP)
    driver.quit()


# --- Tests ---
def test_deep_linking(drvr):
    """
    Deep link with the only non-default state being two extra tbparse event types.
    """
    drvr.get(DEEP_LINK)
    assert_xpath_exists(drvr, "//*[contains(text(), 'audio')]")
    assert_xpath_exists(drvr, "//*[contains(text(), 'hparams')]")


def test_game_load_view_and_deep_link(drvr):
    assert "Streamlit" in drvr.title

    # Load data/test_games.sgfs
    filepath_input = get_xpath(drvr, "//input[@type='text']")
    filepath_input.send_keys(
        [Keys.BACKSPACE] * 300
    )  # https://stackoverflow.com/a/73696871/7086623
    test_games_abs_path = os.path.abspath("data")
    filepath_input.send_keys(test_games_abs_path)
    filepath_input.send_keys(Keys.RETURN)
    load_data_button = get_xpath(drvr, "//*[contains(text(), 'Load data')]")
    load_data_button.click()

    # Focus on Dtale iframe, clear filters and click a cell
    drvr.switch_to.frame(get_xpath(drvr, "//iframe[contains(@src,'dtale')]"))
    dtale_button = get_xpath(drvr, "//*[@title='Clear Filters']")
    dtale_button.click()
    dtale_cell = get_xpath(drvr, "//*[@cell_idx='2|4']")
    dtale_cell.click()

    # Focus on main content again and show the selected game.
    drvr.switch_to.default_content()
    view_game_cell = get_xpath(drvr, "//*[contains(text(), 'View selected game')]")
    view_game_cell.click()

    # Focus on WGO.js iframe. Check correct game is displayed.
    drvr.switch_to.frame(
        get_xpath(drvr, "//iframe[contains(@srcdoc,'wgo.player.min.js')]")
    )
    show_result_button = get_xpath(drvr, "//*[contains(text(), 'show')]")
    show_result_button.click()
    assert_xpath_exists(drvr, "//*[contains(text(), 'W+15.5')]")

    # Focus on main content again and update the url
    drvr.switch_to.default_content()
    view_game_cell = get_xpath(drvr, "//*[contains(text(), 'Update url')]")
    view_game_cell.click()
    time.sleep(1)  # Wait for url to update

    # Open a new tab with the updated url
    drvr.execute_script(f'window.open("{drvr.current_url}","_blank");')
    drvr.switch_to.window(drvr.window_handles[1])

    # Focus on WGO.js iframe. Check the same game is displayed.
    drvr.switch_to.frame(
        get_xpath(drvr, "//iframe[contains(@srcdoc,'wgo.player.min.js')]")
    )
    show_result_button = get_xpath(drvr, "//*[contains(text(), 'show')]")
    show_result_button.click()
    assert_xpath_exists(drvr, "//*[contains(text(), 'W+15.5')]")
