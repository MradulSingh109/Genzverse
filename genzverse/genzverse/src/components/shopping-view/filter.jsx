import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { filterOptions, sortOptions } from "@/config"
import { Fragment } from "react"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useSelector, } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"


function createSearchParamsHelper(filterParams) {
    const queryParams = []
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value)) {
            value.forEach(val => {
                queryParams.push(`${key}=${encodeURIComponent(val)}`)
            })
        }
    }
    return queryParams.join('&')
}

function Filter({ hideSubcategory }) {

    const [filter, setFilter] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        return () => {
            setFilter({});
        };
    }, []);

    function handleFilter(key, value) {
        setFilter(prev => {
            const existing = prev[key] || []
            const isSelected = existing.includes(value)

            return {
                ...prev,
                [key]: isSelected
                    ? existing.filter(item => item !== value)
                    : [...existing, value]
            }
        })
    }



    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        Object.keys(filter).forEach(key => {
            newSearchParams.delete(key);
            if (filter[key].length > 0) {
                filter[key].forEach(value => {
                    newSearchParams.append(key, value);
                });
            }
        });

        setSearchParams(newSearchParams);
    }, [filter, searchParams, setSearchParams]);

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ChevronDown className="h-4 w-4 mt-0.5 hover:cursor-pointer sm:h-6 sm:w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="lg:w-52 md:48 sm:w-40">
                    {filterOptions.map(item => (
                        <div className="flex flex-row gap-2 mt-1" key={item.id}>
                            <Checkbox
                                checked={filter.category?.includes(item.id) || false}
                                onCheckedChange={() => handleFilter("category", item.id)}
                            />
                            <Label>{item.label}</Label>
                        </div>
                    ))}
                    {!hideSubcategory && (
                        <div className="flex flex-row gap-2 mt-1">
                            <Checkbox
                                checked={filter.subcategory?.includes("oversized tshirts") || false}
                                onCheckedChange={() => handleFilter("subcategory", "oversized tshirts")}
                            />
                            <Label>Oversized T-shirts</Label>
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function Sorting() {
   const [searchParams, setSearchParams] = useSearchParams()

  const currentSort = searchParams.get("sortBy") || "lowtohigh"

  const handleSort = (value) => {
    searchParams.set("sortBy", value)
    setSearchParams(searchParams)
  }
    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <ChevronDown className="h-4 w-4 mt-0.5 hover:cursor-pointer sm:h-6 sm:w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="lg:w-52 md:48 sm:w-40">
                    <DropdownMenuRadioGroup value={currentSort} onValueChange={handleSort}>
                        {
                            sortOptions.map((items) =>
                                <DropdownMenuRadioItem value={items.id} className={"font-medium"} key={items.id}>
                                    {
                                        items.label
                                    }
                                </DropdownMenuRadioItem>)
                        }
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function ProductFilter({ hideSubcategory, productCount }) {
    const { productList } = useSelector((state) => state.shopProducts)
    const count = productCount === undefined ? productList?.length : productCount;
    return (
        <div className="flex flex-row mb-3 gap-4 sm:m-9 justify-between">
            <div className="flex flex-row gap-2">
                <div className="text-[12px] sm:text-[16px]">Filter:</div>
                <div className="flex flex-row text-[12px] sm:text-[16px]">
                    Category: <Filter hideSubcategory={hideSubcategory} />
                </div>

                <div className="text-right">
                    <div className="flex flex-row text-[12px] sm:text-[16px]">
                        Sort by: <Sorting />
                    </div>
                </div>
            </div>
            <div className="text-[12px] sm:text-[16px]">
                <span>{count} Products</span>
            </div>
        </div>
    )
}

export default ProductFilter
