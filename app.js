const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');



app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));

app.use('/assets', require('./routes/assets'));


const employeeRoutes = require('./routes/employees');
const assetRoutes = require('./routes/assets');
const assetCategoriesRouter = require('./routes/asset-categories');

const stockRoutes = require('./routes/stock');
const stockRouter = require('./routes/stock');
const returnAssetRouter = require('./routes/return-asset');
const scrapAssetRouter = require('./routes/scrap-asset');
const assetHistoryRouter = require('./routes/asset-history');


// Use routes
app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/stock', stockRoutes);
app.use('/asset-categories', assetCategoriesRouter);
app.use('/stock', stockRouter);
app.use('/return-asset', returnAssetRouter);
app.use('/scrap-asset', scrapAssetRouter);
app.use('/asset-history', assetHistoryRouter);




db.sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database & tables created!');
  });
  


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
