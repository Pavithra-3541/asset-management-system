const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const employeeRoutes = require('./routes/employees');
const assetRoutes = require('./routes/assets');
const assetCategoryRoutes = require('./routes/assetcategories');
const stockRoutes = require('./routes/stock');
const issueAssetRoutes = require('./routes/issueAsset');
const returnAssetRoutes = require('./routes/returnAsset');
const scrapAssetRoutes = require('./routes/scrapAsset');
const assetHistoryRoutes = require('./routes/assetHistory');

// Use routes
app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/asset-categories', assetCategoryRoutes);
app.use('/stock', stockRoutes);
app.use('/issue-asset', issueAssetRoutes);
app.use('/return-asset', returnAssetRoutes);
app.use('/scrap-asset', scrapAssetRoutes);
app.use('/asset-history', assetHistoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
