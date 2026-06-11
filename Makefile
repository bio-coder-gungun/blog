.PHONY: setup dev build jupyter clean

# One-time environment setup — creates the conda env with Node.js + Python
setup:
	conda env create -f conda-environment.yml
	@echo ""
	@echo "  Done. Activate with: conda activate blog-authoring"
	@echo "  Then run: make install"

# Install npm packages (run once after 'make setup' + conda activate)
install:
	npm install

# Start the blog dev server at localhost:3000
dev:
	npm run dev

# Build the static site into out/
build:
	npm run build

# Launch JupyterLab for chart/analysis prototyping
jupyter:
	jupyter lab

# Remove build artifacts
clean:
	rm -rf .next out node_modules
