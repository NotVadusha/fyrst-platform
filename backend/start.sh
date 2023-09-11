npm run start:dev &
sleep 180
npm run db:migrate &
sleep 180
npm run db:seed
tail -f /dev/null