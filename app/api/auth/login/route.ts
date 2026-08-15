// import { NextResponse } from "next/server";
// import pool from "@/lib/db";
// import bcrypt from "bcrypt";


// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     const [users]: any = await pool.query(
//       "SELECT * FROM user WHERE email = ?",
//       [email]
//     );

//     if (users.length === 0) {
//       return NextResponse.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const user = users[0];

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return NextResponse.json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const response = NextResponse.json({
//       success: true,
//       message: "Login Successful",
//     });

//     // Session Cookie
//     response.cookies.set(
//       "userId",
//       user.id.toString(),
//       {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 60 * 60 * 24, // 1 day
//         path: "/",
//       }
//     );

//     return response;

//   } catch (error) {
//     console.error(error);

//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// }




import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const [users]: any = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    // JWT Generate
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
    });

    // Store JWT in Cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}