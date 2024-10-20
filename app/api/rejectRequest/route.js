import { NextResponse } from "next/server";
import GiveRequest from "@/models/giveRequest";
import Taker from "@/models/taker";
import User from "@/models/user";
import { connectDb } from "@/helper/db";
import transporter from "@/helper/nodemailer";

export async function POST(request) {
  try {
    await connectDb();

    // Extract the data from the request body
    const { userId, requestId, reason } = await request.json();

    // Find the giveRequest by requestId
    const giveRequest = await GiveRequest.findById(requestId);

    if (!giveRequest) {
      return NextResponse.json(
        { message: "Give request not found" },
        { status: 404 }
      );
    }

    // Update the volunteerId field in the giveRequest document with the taker's userId
    const updatedGiveRequest = await GiveRequest.findByIdAndUpdate(
      requestId,
      {
        $pull: { requestedBy: userId }, // Remove the userId from requestedBy array
      },
      { new: true }
    );

    // If the giveRequest document was not found, return a 404 Not Found response
    if (!updatedGiveRequest) {
      return NextResponse.json(
        { message: "Give request not updated" },
        { status: 404 }
      );
    }

    // Find the taker by userId
    const taker = await Taker.findOne({ userId });

    if (!taker) {
      return NextResponse.json({ message: "Taker not found" }, { status: 404 });
    }

    // Fetch the email of the taker from the User collection
    const takerUser = await User.findById(userId);

    if (!takerUser) {
      return NextResponse.json(
        { message: "Taker not found in User collection" },
        { status: 404 }
      );
    }

    const takerEmail = takerUser.email;

    // Construct Google Maps link using latitude and longitude
    const mapLink = `https://www.google.com/maps?q=${giveRequest.location.latitude},${giveRequest.location.longitude}`;

    // Send an email to the taker informing them that their request has been accepted
    const mailOptions = {
      from: process.env.EMAIL,
      to: takerEmail,
      subject: "Take Request Rejected",
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0;">
                <h2 style="color: #333333;">Take Request Rejected</h2>
                <hr style="border: 0; border-top: 1px solid #e0e0e0;">
                <p style="color: #666666;">Dear ${takerUser.name},</p>
                <p style="color: #666666;">Your take request for the following delivery, has been rejected by ${giveRequest.name}</p>
                <div style="background-color: #f9f9f9; padding: 10px; margin: 10px 0;">
                    <h3 style="color: #333333; margin-bottom: 10px;">Request Details:</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Reason to reject:</strong> ${reason}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Giver Name:</strong> ${giveRequest.name}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Giving Organization:</strong> ${giveRequest.givingOrg}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Contact:</strong> ${giveRequest.contact}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Food Type:</strong> ${giveRequest.foodType}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Food Serving:</strong> ${giveRequest.foodServing}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Availability:</strong> ${giveRequest.availability}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Landmark:</strong> ${giveRequest.landmark}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Comments:</strong> ${giveRequest.comments}</li>
                        <li style="margin-bottom: 5px; color: #666666;"><strong>Location:</strong> <a href="${mapLink}" style="color: #007bff; text-decoration: none;">View Location on Map</a></li>
                    </ul>

                </div>
                <p style="color: #666666;">Thank you for your generosity.</p>
                <p style="color: #666666;">Best regards,<br><strong>Team SharedPlate</strong></p>
            </div>
            `,
    };

    await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json(
      {
        message: `Give request of ${giveRequest.name} is successfully taken by ${taker.name}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting give request:", error);
    // Handle errors and return appropriate response
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
