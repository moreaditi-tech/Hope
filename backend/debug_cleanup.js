const mongoose = require("mongoose");
const Food = require("./models/Food");

mongoose
    .connect("mongodb+srv://morerajaditi_db_user:94q1FKLgk86T1TFi@cluster0.rllct4v.mongodb.net/foodwaste?retryWrites=true&w=majority")
    .then(async () => {
        console.log("🔥 Connected to DB for Debugging");

        const now = new Date();
        console.log("🕒 Server Time (new Date()):", now);
        console.log("🕒 Server Time ISO:", now.toISOString());

        // 1. Find items that SHOULD be expired
        const expiredCandidates = await Food.find({
            consumeBy: { $lt: now }
        });

        console.log(`\n🔎 Found ${expiredCandidates.length} candidates for deletion (consumeBy < now):`);
        expiredCandidates.forEach(f => {
            console.log(`- [${f._id}] ${f.foodName} | ConsumeBy: ${f.consumeBy} (${typeof f.consumeBy})`);
        });

        // 2. Check items that are NOT expired but look like they might be close
        const allFood = await Food.find({});
        console.log(`\n📦 Total Food Items: ${allFood.length}`);
        allFood.forEach(f => {
            // Log detailed type info
            const isDate = f.consumeBy instanceof Date;
            const val = f.consumeBy;
            if (!isDate) {
                console.log(`⚠️ WARNING: Item [${f._id}] ${f.foodName} has consumeBy type: ${typeof val} (Not a Date object!)`);
            }
        });

        // 3. Attempt Deletion
        const result = await Food.deleteMany({ consumeBy: { $lt: now } });
        console.log(`\n🗑️ Delete Result:`, result);

        mongoose.disconnect();
    })
    .catch(err => console.error(err));
