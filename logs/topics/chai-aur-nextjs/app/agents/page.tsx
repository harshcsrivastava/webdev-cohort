import React from "react";
import Link from "next/link";
import Image from "next/image";

const AgentsPage = () => {
    return (
        <div>
            <Link
                href={{
                    pathname: "/about",
                    query: { name: "test" },
                }}
            >
                Go to About Page
            </Link>

            <Image src="/image.svg" width={500} height={200} alt="Aeroplane" />
        </div>
    );
};

export default AgentsPage;
