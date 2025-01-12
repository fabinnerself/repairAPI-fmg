 CREATE TABLE "user"
(
    "idUser" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "password" VARCHAR(20) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'client' CHECK ("role" IN ('client', 'employee')),
    "status" VARCHAR(20) NOT NULL DEFAULT 'available' CHECK ("status" IN ('available', 'disabled')),
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL
);

CREATE TABLE "repair"
(
    "idRepair" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "date" DATE NOT NULL,
    "status" VARCHAR(15) NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'completed', 'cancelled')),
    "idUser" UUID NOT NULL,
    PRIMARY KEY ("idRepair"),
    FOREIGN KEY ("idUser") REFERENCES "user"("idUser")
);
