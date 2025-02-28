import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Separator } from "./ui/separator";
import Timeline from "./timeline";

export const GridView = () => {
  return (
    <Card className="text-indigo-500">
      <CardHeader className="px-5 pb-2">
        <CardDescription>
          <div className="flex items-center justify-between text-indigo-500/80">
            <p>Rajesh - 9832</p>
            <p>15/02/2025</p>
          </div>
        </CardDescription>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">TS10ET0604</h1>
            <p>Bus</p>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator className="" />
      <CardContent>
        <Timeline />
      </CardContent>
    </Card>
  );
};
