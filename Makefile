.PHONY: format_check
format_check:
	cd python_server && make format
	cd python_server && make check

	cd training && make format
	cd training && make check

	cd nuxt_app && npm run format

.PHONY: install_git_pre_commit_hook
install_git_pre_commit_hook:
	echo '#!/bin/sh\nmake format_check' > .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit

.PHONY: uninstall_git_pre_commit_hook
uninstall_git_pre_commit_hook:
	rm .git/hooks/pre-commit || true