
import { Metadata } from "next";
import HistoryTable from "./components/History";
export const metadata: Metadata = {
    title: 'TDLogistics | History',
}
const DataTablesPage = () => {
    return (
        <div className="mt-5 grid h-[calc(100dvh-158px)] md:h-[calc(100dvh-126px)] grid-cols-1 gap-5">
            <HistoryTable />
        </div>
    );
};

export default DataTablesPage;

