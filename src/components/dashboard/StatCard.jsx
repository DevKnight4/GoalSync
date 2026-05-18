import { Link } from "react-router-dom";

const StatCard = ({
    title,
    value,
    icon,
    link,
}) => {

    const cardContent = (
        <div className="bg-white rounded-3xl border shadow-sm p-8 hover:shadow-md transition cursor-pointer">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-slate-500 text-lg">
                        {title}
                    </p>

                    <h2 className="text-5xl font-bold mt-4">
                        {value}
                    </h2>
                </div>

                <div className="text-slate-400">
                    {icon}
                </div>

            </div>

        </div>
    );

    if (link) {
        return (
            <Link to={link}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

export default StatCard;