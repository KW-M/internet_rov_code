from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import chromedriver_py


chrome_options = Options()
# chrome_options.add_experimental_option("detach", True)
browser_binary_path = '/usr/bin/chromium-browser'

driver_path = chromedriver_py.binary_path

chrome_options.binary_location=browser_binary_path

driver = webdriver.Chrome(driver_path, options=chrome_options)
# driver = webdriver.Chrome()

driver.get("http://localhost:5173/backend/index.html?ForceLocal=false&RovRoomName=ROV123&CloudAPIKey=APIkoE7m3Zqd5dJ&CloudSecretKey=YbHcJZmAAbuI4S5Ba0LHAaXx6v9kfAlyLnviB2aRWSG&LocalAPIKey=NOTSET&LocalSecretKey=NOTSET")
# driver.get("https://www.selenium.dev/selenium/web/web-form.html")

try:
	while True:
		pass
finally:
	print("executing finally block...")
	driver.quit()
	print("quit driver")

