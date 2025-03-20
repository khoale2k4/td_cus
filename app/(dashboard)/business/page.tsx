
import { Metadata } from "next";
import BusinessPage from "./components/Business";
export const metadata: Metadata = {
    title: 'TDLogistics | History',
}
const DataTablesPage = () => {
    return (
        <div className="mt-5 grid h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)] grid-cols-1 gap-5">
            <BusinessPage />
        </div>
    );
};

export default DataTablesPage;

