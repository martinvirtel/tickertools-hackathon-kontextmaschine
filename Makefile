


app/wages.json : wages.json
	jp "{ indien_rupien   : [?(City=='Mumbai') && (Year == '2015-01-01')        ].{ value: Value,name : name}, \
		  brasilien_reais : [?(City=='Rio de Janeiro') && (Year == '2015-01-01')].{ value: Value,name : name} }" \
		  < wages.json >app/wages.json


build-website :
	( \
		set -e \
		git checkout master && \
		npm run build && \
		export ch=$$(git rev-parse HEAD) && \
		tar czf /tmp/$$ch build/ && \
		git checkout gh-pages && \
		tar xvf /tmp/$$ch build/ && \
		git commit build/ -m "built from commit $$ch" ; \
		rm /tmp/$$ch ;\
		git checkout master 
	) \

