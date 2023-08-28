npm run start:dev &
sleep 30
npm run db:seed
tail -f /dev/null