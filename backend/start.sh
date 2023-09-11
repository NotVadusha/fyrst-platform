npm run start:dev &
sleep 240
npm run db:migrate &
sleep 60
npm run db:seed
tail -f /dev/null