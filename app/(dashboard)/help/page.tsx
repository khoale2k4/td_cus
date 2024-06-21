
import { Metadata } from "next";
import HelpCenter from "./components/HelpCenter";
export const metadata: Metadata = {
    title: 'TDLogistics | HelpCenter',
}
const DataTablesPage = () => {
    return (
        <div className="mt-5 grid h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)] grid-cols-1 gap-5">
            <HelpCenter />
        </div>
    );
};

export default DataTablesPage;

