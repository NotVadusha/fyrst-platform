npm run start:dev &
sleep 300
npm run db:seed
tail -f /dev/null