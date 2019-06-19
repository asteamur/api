docker-compose -f dev.docker-compose.yml exec -T api jest --colors --reporters="default" --detectOpenHandles
echo "fin"
