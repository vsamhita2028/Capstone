import axios from "axios";
import { useEffect, useState } from "react";
import MailList from "./getMailList";
import "./mails.css"
import ViewMails from "./viewMails";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import CategoryDeleteWarning from "./categoryDeleteWarning"
const Mails = () => {
    const [CategoryDeleteId, setCategoryDeleteId] = useState(-1)
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [getMailList, setGetMailList] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [addCategoryCard, toggleAddCategoryCard] = useState(false);
    const [category, setCategory] = useState("");
    // const colors = [{ backgroundColor: "#cbcdb7", color: "#636977" }, { backgroundColor: "#F3C583", color: "" }, { backgroundColor: "#E8E46E", color: "" }, { backgroundColor: "#B3E283", color: "" }]
    const [categoryData, setCategoryData] = useState(null)
    const [activeCategory, setActiveCategory] = useState({ category: "All", index: -1 })
    // const handleCategorySettings = (category) => {
    //     setActiveCategory(category)
    // }
    const handleAddCategory = () => {
        axios.post("http://localhost:5000/mails/addCategory", {
            user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress,
            from: "add",
            category: category
        }).then((result) => {
            setIsLoading(true);
            toggleAddCategoryCard(false);
            setCategory("");
            setActiveCategory({ category: "All", index: -1 })
        }).then((result) => {
            fetchData()
        })
    }
    const fetchData = () => {
        axios.get("http://localhost:5000/mails/getCategories", {
            params: {
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        })
            .then(result => {
                const data = result.data.result;
                console.log(data);
                setCategoryData(data);
                setIsLoading(false);
            })
    }
    const handleDeleteCategory = () => {
        console.log(CategoryDeleteId._id);
        axios.delete("http://localhost:5000/mails/delete", {
            data: {
                category: CategoryDeleteId._id,
                user: JSON.parse(localStorage.getItem("token")).data.profile.data.emailAddress
            }
        }).then((result) => {
            setDeleteWarning(false);
            setIsLoading(true);
        }).then(() => {
            setGetMailList(false);
            setActiveCategory({ category: "All", index: -1 })
            fetchData();
        })
    }
    useEffect(fetchData, [])
    if (isLoading) {
        return (<div>Loading...</div>)
    } else {
        return (
            <div>
                {!getMailList ? <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">
                            <div className="mail-desk-headers mb-5 mx-3">Mail Desks</div>
                            <div className="text-break">
                                <div className="row">
                                    <div className="col-12">
                                        <span
                                            className={activeCategory.category === "All" ? "category-pill active-category-pill" : "category-pill"}
                                            onClick={() => setActiveCategory({ category: "All", index: -1 })} >All Mails
                                        </span>
                                        {categoryData && categoryData.map((elem, idx) => (
                                            <span
                                                key={idx}
                                                className={activeCategory.category === elem._id ? "category-pill active-category-pill" : "category-pill"}
                                                onClick={() => setActiveCategory({ category: elem._id, index: idx })}
                                            >
                                                <span >{elem._id}</span>
                                                <span style={{ marginLeft: "1em" }} onClick={() => { setCategoryDeleteId(elem); setDeleteWarning(true) }}>
                                                    <IconContext.Provider value={{ fontSize: "18px" }}>
                                                        <AiFillCloseCircle />
                                                    </IconContext.Provider>

                                                </span>
                                            </span>
                                        ))}
                                        <span className="rounded-circle add-category-btn mx-4" onClick={() => toggleAddCategoryCard(!addCategoryCard)} >
                                            <IconContext.Provider value={{ size: "30px", color: "#cbcde7" }}>
                                                <MdAdd />
                                            </IconContext.Provider>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {addCategoryCard && <div className="mt-3 mx-4">
                                <div className="col-12 col-md-3 col-lg-4 add-category-card ">
                                    <div className="px-sm-3 px-lg-0 row d-flex justify-content-between align-items-center">
                                        <div className="col-9">
                                            <input type="text" className="category-inpt w-100" placeholder="Category.." value={category} onChange={(e) => setCategory(e.target.value)} />
                                        </div>
                                        <div className="col-3 text-end">
                                            <button className="btn add-category-submit-btn" onClick={handleAddCategory}> Done </button>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="row mt-5">

                        {categoryData &&
                            <ViewMails
                                categoryData={categoryData}
                                activeCategory={activeCategory}
                                setIsLoading={setIsLoading}
                                fetchData={fetchData} setGetMailList={setGetMailList} />}
                    </div>
                </div>
                    :
                    <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
                        {getMailList && <MailList from={getMailList} setGetMailList={setGetMailList} />}
                    </div>
                }
                {deleteWarning && <CategoryDeleteWarning setDeleteWarning={setDeleteWarning} handleDeleteCategory={handleDeleteCategory} />}
            </div>
        );
    }
}
export default Mails;