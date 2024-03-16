import {
    Button,
    Dialog,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useApiInterceptor from "./interceptor/useApiInterceptor";
import Snackbar from "@mui/material/Snackbar";
import Header from "./header";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import DialogeBox from "./addUpdate";
import Pagination from './pagination';

const Company = () => {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const columns = [
        { id: "id", name: "CoinId" },
        { id: "name", name: "Name" },
        { id: "price", name: "Price" },
        { id: "currency", name: "Currency" },
        { id: "code", name: "Code" },
        { id: "origin", name: "Origin" },
    ];

    const initialState = {
        coinId: "",
        name: "",
        currency: "",
        price: "",
        origin: "",
        code: "",
    };

    const api = useApiInterceptor();
    const [formData, setFormData] = useState(initialState);
    const [open, openchange] = useState(false);

    const [paginatedData, setPaginatedData] = useState([]);

    const [visiblePages, setVisiblePages] = useState([]);
    const [isloading, setLoading] = useState(true);
    const [currentRecord, setCurrentRecord] = useState(1);
    const [page, setPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(1);
    const [pageTotal, setPageTotal] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const range = 10;
    const maxVisiblePages = 3;
    const [search, setSearch] = useState("");
    const [isedit, iseditchange] = useState(false);
    const [title, titlechange] = useState("Create company");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMsg] = useState("");
    const [toasterOpen, setToasterOpen] = useState(false);

    const setVisiblePageList = () => {
        const range = (start, stop, step) =>
            Array.from(
                { length: (stop - start) / step + 1 },
                (_, i) => start + i * step
            );

        const pageRange = range(1, totalPages, 1);
        if (page <= Math.ceil(maxVisiblePages / 2)) {
            setVisiblePages(pageRange.slice(0, maxVisiblePages));
        } else if (page > totalPages - Math.ceil(maxVisiblePages / 2)) {
            setVisiblePages(
                pageRange.slice(totalPages - maxVisiblePages, totalPages)
            );
        } else {
            const sliceRange = Math.floor(maxVisiblePages / 2);
            const isOdd = maxVisiblePages % 2;
            setVisiblePages(
                pageRange.slice(page - sliceRange - (isOdd ? 1 : 0), page + sliceRange)
            );
        }
    };

    const updatePagination = (response) => {
        setCurrentRecord((page - 1) * range + 1);
        setTotalRecord(response.totalRecord);
        setTotalPages(response.totalPage);
        setPageTotal(currentRecord + response.pageTotal - 1);
    };

    const functionadd = () => {
        iseditchange(false);
        titlechange("Create company");
        openpopup();
    };
    const closepopup = () => {
        openchange(false);
    };
    const openpopup = () => {
        openchange(true);
    };

    const handleEdit = (data) => {
        iseditchange(true);
        titlechange("Update company");
        openchange(true);
        setFormData({
            name: data.name,
            currency: data.currency,
            price: data.price,
            origin: data.origin,
            code: data.code,
            coinId: data.coinId,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setToasterOpen(false);
    };

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const getProductList = async (body = { search: "", page: 1, range: 10 }) => {
        try {
          const res = await api.post("/v1/products", body);
          setPaginatedData(res.pagindatedData);
          setLoading(false);
          updatePagination(res);
        } catch (error) {
          setError(error.errorMsg || error.message);
        }
      };
      
      const addProduct = async () => {
        try {
       delete formData.coinId;
          const res = await api.post("/v1/products/add", formData);
          if (res.success) {
            setError("")
            setToasterOpen(true);
            setSuccessMsg("Coin Added Successfully");
            await getProductList();
          }
        } catch (error) {
            setToasterOpen(true);
          setError(error.errorMsg || error.message);
        }
      };
      
      const updateProduct = async () => {
        try {
          const res = await api.put(`/v1/products`, formData);
          if (res.success) {
            setError("")
            setToasterOpen(true);
            setSuccessMsg("Coin Updated Successfully");
            await getProductList();
          }
        } catch (error) {
          setError(error.errorMsg || error.message);
        }
      };
      
      const deleteProduct = async (coinId) => {
        try {
          const res = await api.post(`/v1/products/delete`, {coinId});
          if (res.success) {
            setError("")
            setToasterOpen(true);
            setSuccessMsg("Coin Deleted Successfully");
            await getProductList();
          }
        } catch (error) {
          setError(error.errorMsg || error.message);
        }
      };
      

    const handleRemove = (coinId) => {
        if (window.confirm("Do you want to remove?")) {
            deleteProduct(coinId);
        }
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (isedit) {
            updateProduct();
        } else {
            addProduct();
        }
        closepopup();
    };

    const handlePage = (page) => {
        setPage(page);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        const body = {
            search: "",
            page: page,
            range: 10,
        };
        getProductList(body);
    }, [page]);

    useEffect(() => {
        const body = {
            search: search,
            page: page,
            range: 10,
        };
        getProductList(body);
    }, [search]);

    useEffect(() => {
        setVisiblePageList();
    }, [totalPages]);

    const vertical = "top";
    const horizontal = "right";

    return isloading ? (
        <div>
            <h2>Loading.....</h2>
        </div>
    ) : (
        <>
            {" "}
            <Header />
            <Snackbar
                open={toasterOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={TransitionLeft}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert
                    onClose={handleClose}
                    severity={error ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {error ? error : successMessage}
                </Alert>
            </Snackbar>
            <div>
                <Paper sx={{ margin: "1%" }}>
                    <div style={{ margin: "1%" }}>
                        <Button onClick={functionadd} variant="contained">
                            Add New (+)
                        </Button>
                    </div>
                    <div className="col-md-6">
                        <div className="search-clear-blk">
                            <div className="search-box-block">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="form-control"
                                    placeholder="Search"
                                />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: "1%" }}>
                        <TableContainer sx={{ width: "100%" }}>
                            <Table>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: "midnightblue" }}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} style={{ color: "white" }}>
                                                {column.name}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData &&
                                        paginatedData.map((row, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell>{row.coinId}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>{row.price}</TableCell>
                                                    <TableCell>{row.currency}</TableCell>
                                                    <TableCell>{row.code}</TableCell>
                                                    <TableCell>{row.origin}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={(e) => {
                                                                handleEdit(row);
                                                            }}
                                                            variant="contained"
                                                            color="primary"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            onClick={(e) => {
                                                                handleRemove(row.coinId);
                                                            }}
                                                            variant="contained"
                                                            color="error"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Pagination
                            currentRecord={currentRecord}
                            pageTotal={pageTotal}
                            totalRecord={totalRecord}
                            page={page}
                            totalPages={totalPages}
                            handlePage={handlePage}
                            visiblePages={visiblePages}
                        />
                    </div>
                </Paper>

                <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                    <DialogTitle>
                        <span>{title}</span>
                        <IconButton style={{ float: "right" }} onClick={closepopup}>
                            <CloseIcon color="primary"></CloseIcon>
                        </IconButton>
                    </DialogTitle>
                    <DialogeBox
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handlesubmit}
                    />
                </Dialog>
            </div>
        </>
    );
};

export default Company;
