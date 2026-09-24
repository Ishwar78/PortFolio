const Admin = require('../module/Admin');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const adminEmail = 'Ishwarweb@admin.com';
    const plainPassword = 'AdminIshwar@1234#';

    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });

    if (!existingAdmin) {
      const newAdmin = new Admin({
        email: adminEmail,
        password: plainPassword,
        name: 'Ishwar Sharma',
        role: 'admin',
      });

      await newAdmin.save();
      console.log(`✨ Default Admin created successfully in MongoDB: ${adminEmail}`);
    } else {
      // Ensure existing admin credentials match
      const isMatch = await existingAdmin.comparePassword(plainPassword);
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        existingAdmin.password = await bcrypt.hash(plainPassword, salt);
        await existingAdmin.save();
        console.log(`🔄 Admin password updated to match configuration: ${adminEmail}`);
      } else {
        console.log(`🔒 Admin credentials verified in MongoDB: ${adminEmail}`);
      }
    }
  } catch (error) {
    console.error('⚠️ Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;
