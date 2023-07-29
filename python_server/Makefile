PYTHON=venv/bin/python3
DIRS=python_server

.PHONY: install_python
install_python:
	sudo apt-get install python3.11 python3.11-venv python3.11-dev
	rm -r venv || true
	python3.11 -m venv venv
	venv/bin/pip install --upgrade pip
	venv/bin/pip install -r requirements.txt
	venv/bin/pip install -e .


.PHONY: run_dev
run_dev:
	${PYTHON} -m python_server --dev

.PHONY: run_prod
run_prod:
	${PYTHON} -m python_server


.PHONY: deploy
deploy:
	flyctl deploy


.PHONY: check
check:
	${PYTHON} -m flake8 --max-line-length 120 ${DIRS}

	${PYTHON} -m mypy --install-types --non-interactive ${DIRS} > /dev/null 2>&1 || true
	${PYTHON} -m mypy --ignore-missing-imports --explicit-package-bases --check-untyped-defs ${DIRS}

.PHONY: format
format:
	${PYTHON} -m black -t py311 -l 120 ${DIRS}
	${PYTHON} -m isort -l 120 ${DIRS}
