LIBS_DIR = libs
DEPLOY_DIR = dist
BUILD_DIR = build
NPM = npm
WEBPACK = ./node_modules/.bin/webpack


LIBFLAC_DIR = node_modules/libflacjs/dist/min/
OLM_DIR = node_modules/olm
RNNOISE_WASM_DIR = node_modules/rnnoise-wasm/dist/
TFLITE_WASM = libs/vendor/tflite
MEET_MODELS_DIR  = libs/vendor/models/

all: clean compile transpile deploy

clean:
	rm -fr $(DEPLOY_DIR)
	mkdir -p $(DEPLOY_DIR)/esm
	cp -r dom $(DEPLOY_DIR)/esm


transpile:
	npm run transpile

compile:
	npm run build

	
deploy: deploy-rnnoise-binary deploy-olm deploy-tflite deploy-tflite-models


deploy-rnnoise-binary:
	cp \
		$(RNNOISE_WASM_DIR)/* \
		$(DEPLOY_DIR)

deploy-olm:
	cp \
		$(OLM_DIR)/olm.wasm \
		$(DEPLOY_DIR)

deploy-tflite:
	cp \
		$(TFLITE_WASM)/*.wasm \
		$(DEPLOY_DIR)

deploy-tflite-models:
	cp \
		$(MEET_MODELS_DIR)/*.tflite \
		$(DEPLOY_DIR)
