import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

const HolopinImage = ({ user }, ref) => (
  <a ref={ref}>
    <Image
      src={`https://holopin.me/${user}`}
      alt={`@${user}'s Holopin board`}
      width={2428}
      height={764}
    />
  </a>
);

const HolopinRef = forwardRef(HolopinImage);

const Holopin = ({ user }) => (
  <div>
    <Link href={`https://holopin.io/@${user}`}>
      <HolopinRef user={user} />
    </Link>
  </div>
);
