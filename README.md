# cvat-sam-label-shortcuts
This script aims to enhance the experience of labeling using the ```Segment Anything``` interactor in ```CVAT``` by adding shortcuts to the label class.

## Features
- Allow using num keys to select the label class in the Segment Anything interaction (e.g., the first class in your annotation job can be selected by entering the num key `1`).

## Installation
1. Use any of the browsers ```Chrome```, ```Firefox```, ```Edge```
2. Install ```Tampermonkey``` plugins in the browser from [Tampermonkey](https://www.tampermonkey.net/)
3. Install this plugin from [GitHub](https://github.com/majarml/cvat-sam-label-shortcuts/raw/main/cvat-sam.user.js)

## Usage
1. Open the CVAT annotation interface by selecting a job on [CVAT](https://app.cvat.ai/)
2. Click on AI tools and select ```Segment Anything``` as the interactor
3. Click on the label text field to load all the classes
4. Then you are good to go! Now you can use the num keys to select a class to annotate!
