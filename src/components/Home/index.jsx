import { Button, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTab, changeTab } from "../../actions/tabActions";
import { getListTable } from "../../actions/tableActions";
import TableRadio from "../Table";

const Home = (props) => {
    const dispatch = useDispatch();
    const { listTable } = useSelector((state) => state.tables);
    const { panes } = useSelector((state) => state.tabs);

    const [byStatus, setByStatus] = useState("");

    useEffect(() => {
        dispatch(getListTable({ byStatus }));
    }, [byStatus, dispatch]);

    const add = async (table) => {
        const newPanes = [...panes];
        const panesExist = newPanes.find((item) => item.title === table.name);
        if (panesExist) {
            dispatch(changeTab(table._id));
            return;
        }
        dispatch(addNewTab(table.name, table));
        dispatch(changeTab(table._id));
    };

    const getAll = () => {
        dispatch(getListTable());
        setByStatus("");
    };

    const changePage = (page) => {
        console.log(page);
    };

    return (
        <>
            <div className="btn_filter_group">
                <Button onClick={() => getAll()}>Tất cả</Button>
                <Button onClick={() => setByStatus("Trống")}>Bàn trống</Button>
                <Button>Đã thanh toán</Button>
                <Button>Chưa thanh toán</Button>
            </div>
            <div className="wrapper">
                <div className="list_tables">
                    {listTable &&
                        listTable.map((item) => (
                            <TableRadio
                                name={`${item.name}`}
                                table={item}
                                onClick={() => add(item)}
                                key={item._id}
                            />
                        ))}
                </div>
                <Pagination
                    defaultCurrent={1}
                    total={listTable && listTable.length}
                    className="pagination"
                    pageSize={3}
                />
            </div>
        </>
    );
};

export default Home;
