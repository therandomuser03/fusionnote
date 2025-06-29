import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const tags = ["Work", "Ideas", "Personal", "Meeting"];

export default function TopTags() {
  return (
    <>
      <h3 className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl">
        Top Tags
      </h3>
      <div className="z-20 w-full flex items-center justify-center gap-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full">
          {tags.map((tag) => (
            <Card
              key={tag}
              className="text-center py-6 px-4 font-medium text-lg hover:shadow-md transition-all cursor-pointer"
            >
              {tag}
            </Card>
          ))}
        </div>
        </div>

        <div className="z-20 text-2xl font-medium mx-auto items-center justify-center py-3 max-w-6xl mt-6">
          <Button variant="outline">View All Tags</Button>
        </div>
      {/* </div> */}
    </>
  );
}
