import { ThreeDots } from "react-loader-spinner";

export const Loading = () => {
    return (
        <div className="flex flex-col min-h-screen space-y-[60px]">
        <div className="flex flex-col items-center justify-center flex-auto">
            <ThreeDots
            height="120px"
            width="120px"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            visible={true}
            />
        </div>
        </div>
    );
    };