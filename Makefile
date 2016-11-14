


app/wages.json : wages.json
	jp "{ indien_rupien   : [?(City=='Mumbai') && (Year == '2015-01-01')        ].{ value: Value,name : name}, \
		  brasilien_reais : [?(City=='Rio de Janeiro') && (Year == '2015-01-01')].{ value: Value,name : name} }" \
		  < wages.json >app/wages.json


