// import { NextResponse } from "next/server";
// // import { CgPassword } from "react-icons/cg";

// export async function POST(req: Request) {

//     const body = await req.json();
//     // const { name, email, password, confimPassword } = body;
//     // if (!email || !password || !name || !confimPassword) {
//     //     return NextResponse.json({
//     //         success: false,
//     //         message: "All fields are required",
//     //     })
//     // }

//     // if(
//     //     email==="admin@gmail.com" && password === "12345"
//     // ){
//     //     return NextResponse.json({
//     //         success:true,
//     //         message:"Login Successful"
//     //     });
//     // }
//     // return NextResponse.json({
//     //     success:false,
//     //     message:"Invalid Credentials",
//     // });

//     // return NextResponse.json({
//     //     success: true,
//     //     message: "Signup Successful",
//     // });


//     console.log(body);
//     return NextResponse.json({
//         message: "Login route working",
//     });
// }


import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Step 1: Check email exists or not
    const [user]: any = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    // Step 2: If exists
    if (user.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Email already registered",
      });
    }

    // Step 3: If not exists, insert user
   
    await pool.query(
      "INSERT INTO user(name,email,password) VALUES(?,?,?)",
      [name, email, hashedPassword]
    );

    // Step 4: Success response
    return NextResponse.json({
      success: true,
      message: "User Registered Successfully",
    });

  } catch (error: any) {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error?.message);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}