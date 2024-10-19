const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const createAvailabilityRepo = async (rentPerDay, availableAt, available) => {
  const newAvailability = await prisma.availability.create({
    data: {
      rent_perday: rentPerDay,
      available_at: availableAt,
      available: available,
    },
  });
  const serializedAvailability = JSONBigInt.stringify(newAvailability);
  console.log(`New availability created: ${serializedAvailability}`);

  return JSONBigInt.parse(serializedAvailability);
};

const updateAvailabilityRepo = async (
  id,
  rentPerDay,
  availableAt,
  available
) => {
  const updatedAvailability = await prisma.availability.update({
    where: { id },
    data: {
      rent_perday: rentPerDay,
      available_at: availableAt,
      available,
    },
  });
  const serializedAvailabilitys = JSONBigInt.stringify(updatedAvailability);
  return JSONBigInt.parse(serializedAvailabilitys);
};

const deleteAvailabilityRepo = async (id) => {
  try {
    // Mencetak ID yang akan dihapus untuk debugging
    console.log(`Trying to delete availability with ID: ${id}`);

    // Memastikan ID adalah tipe data yang benar
    const availabilityId = Number(id); // Pastikan ID adalah number

    // Mencari entri ketersediaan berdasarkan ID
    const availability = await prisma.availability.findUnique({
      where: { id: availabilityId },
    });

    // Mencetak hasil pencarian untuk debugging
    console.log(`Availability found: ${JSON.stringify(availability)}`);

    // Memeriksa apakah entri ditemukan
    if (!availability) {
      console.log(`Availability not found for the given id: ${availabilityId}`);
      throw new Error(
        `Availability not found for the given id: ${availabilityId}`
      );
    }

    // Menghapus entri ketersediaan
    const deletedAvailability = await prisma.availability.delete({
      where: { id: availabilityId },
    });

    // Mengonversi hasil penghapusan menjadi string untuk penyimpanan yang aman
    const serializedAvailability = JSONBigInt.stringify(deletedAvailability);
    console.log(`Deleted availability: ${serializedAvailability}`);

    return JSONBigInt.parse(serializedAvailability);
  } catch (error) {
    // Menangkap dan mencetak kesalahan jika terjadi
    console.error("Error deleting availability:", error);
    throw new Error("Failed to delete availability: " + error.message);
  }
};

module.exports = {
  createAvailabilityRepo,
  updateAvailabilityRepo,
  deleteAvailabilityRepo,
};
