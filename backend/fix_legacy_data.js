const mongoose = require("mongoose");
const Food = require("./models/Food");

mongoose
    .connect("mongodb+srv://morerajaditi_db_user:94q1FKLgk86T1TFi@cluster0.rllct4v.mongodb.net/foodwaste?retryWrites=true&w=majority")
    .then(async () => {
        console.log("🔥 Connected to DB to Fix Legacy Data");

        // 1. Delete items where consumeBy is MISSING or NULL
        const result1 = await Food.deleteMany({ consumeBy: null });
        console.log(`🗑️ Deleted ${result1.deletedCount} items with NULL consumeBy`);

        // 2. Delete items where consumeBy is NOT a valid date (if possible via query, otherwise standard cleanup handles it)
        // The previous script showed "undefined", which usually means the field doesn't exist in the doc.
        const result2 = await Food.deleteMany({ consumeBy: { $exists: false } });
        console.log(`🗑️ Deleted ${result2.deletedCount} items where consumeBy field is MISSING`);

        console.log("✅ Cleanup complete.");
        mongoose.disconnect();
    })
    .catch(err => console.error(err));
