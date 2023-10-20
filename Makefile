improve:
	docker run -it --rm -e OPENAI_API_KEY -v .:/project gpt-engineer -i
.PHONY: improve

run:
	python3 -m http.server
.PHONY: run