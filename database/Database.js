import sqlite3 from "sqlite3";

export function initializeDatabase() {
	const database = new sqlite3.Database("database.db");
	database.serialize(() => {
		database.run(
			"CREATE TABLE IF NOT EXISTS DATA (" +
				"ID INT PRIMARY KEY, " +
				"NAME TEXT, " +
				"CONTACT INT, " +
				"EMAIL TEXT, " +
				"VACCINATED INT, " +
				"TYPE TEXT)"
		);
		// database.run(
		// 	"INSERT OR IGNORE INTO DATA VALUES (0, 'MOCK_NAME', 88888888, 'MOCK_EMAIL', 0, 'MOCK_TYPE')"
		// );
	});
}
