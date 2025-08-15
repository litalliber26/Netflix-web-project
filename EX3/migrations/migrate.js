const mongoose = require("mongoose");
const Movie = require("../models/movie");
const Category = require("../models/category");
const Counter = require("../models/counter");

class Migration {
    constructor(uri) {
        this.uri = uri;
        this.migrations = [];
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("✅ Connected to MongoDB!");
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            throw error;
        }
    }

    async disconnect() {
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB");
    }

    // Add a migration
    addMigration(name, up, down) {
        this.migrations.push({ name, up, down });
    }

    // Run all migrations
    async migrate() {
        try {
            await this.connect();

            // Create migrations collection if it doesn't exist
            const MigrationModel = mongoose.model('Migration', new mongoose.Schema({
                name: String,
                appliedAt: Date
            }));

            // Get applied migrations
            const appliedMigrations = await MigrationModel.find().sort({ appliedAt: 1 });
            const appliedMigrationNames = new Set(appliedMigrations.map(m => m.name));

            // Run pending migrations
            for (const migration of this.migrations) {
                if (!appliedMigrationNames.has(migration.name)) {
                    console.log(`Running migration: ${migration.name}`);
                    await migration.up();
                    await MigrationModel.create({
                        name: migration.name,
                        appliedAt: new Date()
                    });
                    console.log(`✅ Completed migration: ${migration.name}`);
                }
            }

            console.log("✅ All migrations completed successfully!");
            return true;
        } catch (error) {
            console.error("❌ Migration failed:", error);
            throw error;
        } finally {
            await this.disconnect();
        }
    }
}

// Create migration instance
const migration = new Migration(process.env.CONNECTION_STRING);

// Add migrations
migration.addMigration('init-categories', async () => {
    const categories = ["Action", "Drama"];
    for (let i = 0; i < categories.length; i++) {
        const existingCategory = await Category.findOne({ name: categories[i] });
        if (!existingCategory) {
            await Category.create({ name: categories[i], promoted: !i });
            console.log(`Created category: ${categories[i]}`);
        }
    }
}, async () => {
    await Category.deleteMany({});
});

migration.addMigration('init-counter', async () => {
    const existingCounter = await Counter.findOne({ name: "movieIntId" });
    if (!existingCounter) {
        await Counter.create({ name: "movieIntId", value: 102 });
        console.log("Created movieIntId counter");
    }
}, async () => {
    await Counter.deleteMany({ name: "movieIntId" });
});

migration.addMigration('init-sample-movies', async () => {
    const sampleMovies = [
        {
            name: "Sample Movie 1",
            category: "Action",
            videoFileName: "1737488808912-337601987.mp4",
            videoMimeType: "video/mp4",
            previewPhotoFileName: "1737488808912-205735857.jpg",
            intId: 101,
        },
        {
            name: "Sample Movie 2",
            category: "Drama",
            videoFileName: "1737530507725-49360434.mp4",
            videoMimeType: "video/mp4",
            previewPhotoFileName: "1737530507725-34417342.jpg",
            intId: 102,
        }
    ];

    for (const movieData of sampleMovies) {
        const existingMovie = await Movie.findOne({ intId: movieData.intId });
        if (!existingMovie) {
            await Movie.create(movieData);
            console.log(`Created movie: ${movieData.name}`);
        }
    }
}, async () => {
    await Movie.deleteMany({});
});

// Export the migration instance
module.exports = migration;

// Run migrations if this file is executed directly
if (require.main === module) {
    migration.migrate()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}