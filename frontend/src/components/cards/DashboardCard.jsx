function DashboardCard({
    title,
    value,
    icon,
    color,
    description
}) {

    return (

        <div
            className="
                card
                hover:scale-105
                border-l-[6px]
            "
            style={{
                borderColor: color
            }}
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 font-semibold">

                        {title}

                    </p>

                    <h1 className="text-5xl font-bold mt-4 text-gray-800">

                        {value}

                    </h1>

                    <p className="mt-3 text-gray-400">

                        {description}

                    </p>

                </div>

                <div
                    className="
                        h-16
                        w-16
                        rounded-full
                        flex
                        items-center
                        justify-center
                        shadow-md
                    "
                    style={{
                        backgroundColor: `${color}20`,
                        color: color
                    }}
                >

                    <div className="text-3xl">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;