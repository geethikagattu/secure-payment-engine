## About The Project

The **Secure Payment Engine** is a robust backend architecture designed for secure and scalable transaction processing. It is engineered with a multi-database approach using **MySQL (Sequelize ORM)** for relational user/transaction data and **MongoDB (Mongoose)** for high-volume activity and fraud detection logging. 

**Key Features:**
- 🔒 **Security:** JWT Authentication, Bcrypt password hashing, and Express Rate Limiting backed by Redis.
- 🛡️ **Reliability:** Strict request validation using Zod and comprehensive test coverage via Jest & Supertest.
- 📚 **Documentation:** Auto-generated interactive API documentation using Swagger UI.
- 🚀 **Performance:** TypeScript-compiled Express server optimized for PM2 cluster-mode deployment on AWS EC2.
- 🏗️ **Architecture:** Clean MVC pattern with centralized error handling.
