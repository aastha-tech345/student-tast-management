export async function validateStudent(data, isUpdate = false) {
  const requiredFields = isUpdate
    ? [
        "id",
        "userId",
        "firstName",
        "lastName",
        "gender",
        "age",
        "email",
        "phone",
        "className",
      ]
    : [
        "userId",
        "firstName",
        "lastName",
        "gender",
        "age",
        "email",
        "phone",
        "className",
      ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw Object.assign(new Error(`Missing required field: ${field}`), {
        status: 400,
      });
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    throw Object.assign(new Error("Invalid email format"), { status: 400 });
  }

  if (!/^\d{10}$/.test(data.phone)) {
    throw Object.assign(new Error("Phone number must be 10 digits"), {
      status: 400,
    });
  }

  if (isNaN(data.age) || data.age <= 0) {
    throw Object.assign(new Error("Age must be a positive number"), {
      status: 400,
    });
  }
}

export async function validateUser(data) {
  const requiredFields = [
    "fullName",
    "phoneNumber",
    "email",
    "dateOfBirth",
    "password",
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw Object.assign(new Error(`Missing required field: ${field}`), {
        status: 400,
      });
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    throw Object.assign(new Error("Invalid email format"), { status: 400 });
  }

  if (!/^\d{10}$/.test(data.phoneNumber)) {
    throw Object.assign(new Error("Phone number must be 10 digits"), {
      status: 400,
    });
  }

  if (isNaN(Date.parse(data.dateOfBirth))) {
    throw Object.assign(new Error("Invalid date of birth"), { status: 400 });
  }

  if (data.password.length < 8) {
    throw Object.assign(new Error("Password must be at least 8 characters"), {
      status: 400,
    });
  }
}
