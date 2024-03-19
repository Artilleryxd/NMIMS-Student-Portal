import { useTheme } from "../../Components/theme-provider";
import React, { useState , useEffect} from "react";
import Nav from "../../Components/Nav";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

const Profile = () => {
  // State for profile rating
  const [rating, setRating] = useState(3); // Initial rating value

  // Function to handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-start">
        <div className="p-2 m-1 grid gap-4 w-fit">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVc22FgIapuN5SmPjiN6uI3Vfj1uNO1ShdSg&usqp=CAU"
                className="rounded-full"
              />
              <p className="mt-2 text-xl text-white">Test User</p>
              <button className="mt-1 px-5 w-56 h-8 bg-gray-600 rounded border-white border">
                Edit Profile
              </button>
              <p className="mt-3 text-white">1 Connections</p>

              {/* Profile rating */}
              <div className="flex items-center">
                <p className="mr-2">Rating:</p>
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    className={`${
                      index < rating ? "text-yellow-400" : "text-gray-400"
                    } focus:outline-none`}
                    onClick={() => handleRatingChange(index + 1)}
                  >
                    ★
                  </button>
                ))}
              </div>

              
              <hr className="my-2" />
              <h2 className="text-white text-lg font-bold">Achievements</h2>
              <div className="flex flex-wrap justify-start">
                <img
                  src="https://camo.githubusercontent.com/a8c9e62c43e6d2b3015763decd6dbd168c48159a9f85dc91be655084b176ed86/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f696d616765732f6d6f64756c65732f70726f66696c652f616368696576656d656e74732f7374617273747275636b2d64656661756c742e706e67"
                  className="rounded-full w-16 mx-2 my-1"
                />
                <img
                  src="https://camo.githubusercontent.com/08cde699043de999129e567cf2a1b4e060d2e8b9852e9ff96dce80d23a90f737/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f696d616765732f6d6f64756c65732f70726f66696c652f616368696576656d656e74732f6f70656e2d736f757263657265722d64656661756c742e706e67"
                  className="rounded-full w-16 mx-2 my-1"
                />
              </div>
              <hr className="my-2" />
              <h2 className="my-3">BIO</h2>
              <p>**WRITE BIO HERE**</p>
              
            </CardContent>
          </Card>
        </div>
        <div className="p-2 m-1 grid gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <hr className="my-2 " />
            <p className="p-2 m-2 text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio,
              ea eveniet! Exercitationem quis autem dignissimos recusandae
              voluptate nihil ad porro rem mollitia, expedita eos hic alias
              amet consequuntur beatae pariatur totam atque ea blanditiis
              neque? Unde, architecto beatae nihil laudantium minus, nemo quam
              mollitia quisquam quia debitis in, assumenda fugit tenetur
              distinctio dolores? Suscipit dolore sit tempora repellendus
              explicabo? Autem sed veritatis, id eos at neque saepe, sit
              similique labore tenetur atque quibusdam repudiandae reiciendis
              animi aspernatur? Consequatur officiis vitae possimus doloribus,
              fuga at fugiat tempore qui earum magnam, enim ipsum dicta
              excepturi dolore, repudiandae non rem ipsa culpa. Eum!
            </p>
            <h2 className="p-2 m-2 text-xl">Badges:</h2>
            <hr className="my-2 " />
            <div className="flex flex-wrap justify-start">
              <img
                src="https://i.pinimg.com/originals/23/86/20/2386205b62649a3149b4c78228ed2706.png"
                className="h-16 m-2"
              />
              <img
                src="https://i.pinimg.com/originals/23/86/20/2386205b62649a3149b4c78228ed2706.png"
                className="h-16 m-2"
              />
              <img
                src="https://i.pinimg.com/originals/23/86/20/2386205b62649a3149b4c78228ed2706.png"
                className="h-16 m-2"
              />
              <img
                src="https://i.pinimg.com/originals/23/86/20/2386205b62649a3149b4c78228ed2706.png"
                className="h-16 m-2"
              />
              <img
                src="https://i.pinimg.com/originals/23/86/20/2386205b62649a3149b4c78228ed2706.png"
                className="h-16 m-2"
              />
            </div>
            <h2 className="p-2 m-2 text-xl">Address:</h2>
            <hr className="my-2 " />
            <p className="p-2 m-2 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              vero voluptates provident odio quis, et inventore ut nemo
              reprehenderit delectus!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
