import React, { useEffect, useState, type SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Tag from "../components/Tag";
import Button from "../components/Button";
import SvgReset from "../assets/icons/icon-reset.svg?react";

// type
type FilterDataType = {
    label: string,
    queryName: string,
    options: {label: string, value: string}[];
}

type SelectedTag = {
    queryName: string;
    label: string;
    value: string;
};

// styled
const StyledFilterForm = styled.form`
    width: 100%;
    border-block: 0.2rem solid ${({ theme }) => theme.colors.gray200};
    margin-block: 3.2rem;
    overflow-x: hidden;
    @media ${({ theme }) => theme.devices.tablet} {
        overflow-x: scroll;
    }
`;

const StyledFieldset = styled.fieldset`
    width: 100%;
    padding: 2rem;
    
    display: flex;
    justify-content: start;
    align-items: start;


    &:not(:last-child) {
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    }

    span {
        font-weight: 700;
        white-space: nowrap;
        width: clamp(8rem, 8vw, 10rem);
    }
`;

const StyledFilterList = styled.ul`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem 3.2rem;
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.tablet} {
        flex-wrap: nowrap;
    }
`;

const StyledFilterItem = styled.li`
    white-space: nowrap;
    font-weight: 400;
    
    label {
        cursor: pointer;
        position: relative;
    }

    span {
        font-weight: 400;
    }

    input[type="checkbox"] {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    input[type="checkbox"]:checked + span {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary300};
    }
`;

const StyledTagWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 5.2rem;
`;

const StyledTagList = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
`;

// function
function matchLabelFromData({ filterData, queryName, value }: {
    filterData: FilterDataType[],
    queryName: string,
    value: string,
}) {
    if (!filterData) return;

    const label = filterData
            .find(item => item.queryName === queryName)?.options
            .find(options => options.value === value)?.label || "";
    return label;
};

// components
const FilterTags = ({ selectedTags, setSelectedTags }: {
    selectedTags: SelectedTag[];
    setSelectedTags: React.Dispatch<SetStateAction<SelectedTag[]>>
}) => {
    const handleReset = () => {
        setSelectedTags([]);
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        const targetLabel = e.currentTarget.dataset.label;

        setSelectedTags(prev => (
            prev.some(tag => tag.label === targetLabel)
                ? prev.filter(tag => tag.label !== targetLabel)
                : prev
        ));
    };
    
    return (
        <StyledTagWrapper aria-label="필터링 조건 태그 목록">
            <Button variant="outline" iconSvg={<SvgReset/>} onClick={handleReset}>
                필터 초기화
            </Button>
            <StyledTagList>
                {selectedTags.map(tag => (
                    <button key={tag.value} data-label={tag.label} onClick={handleDelete}>
                        <Tag variant="dark" hasDelete={true}>{tag.label}</Tag>
                    </button>
                ))}
            </StyledTagList>
        </StyledTagWrapper>
    )
};

const FilterForm = ({ filterData, hasTags = true }: { 
    filterData: FilterDataType[];
    hasTags?: boolean;
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isInitialized, setIsInitialized] = useState(false);
    const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        const label = matchLabelFromData({ filterData, queryName: name, value });
        if(!label) return;

        setSelectedTags(prev => (
            checked
            ? prev.some(tag => tag.value === value)
                ? prev
                : [...prev, { queryName: name, value, label }]
            : prev.filter(tag => tag.value !== value)
        ))
    }

    useEffect(() => {
        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key);
            values.forEach(value => {
                const label = matchLabelFromData({ filterData, queryName: key, value});
                if(!label) return;
                
                setSelectedTags(prev => (
                    prev.some(tag => tag.value === value)
                        ? prev
                        : [...prev, { queryName: key, value, label }]
                ));
            })
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;

        const params = new URLSearchParams();
        selectedTags.forEach(({ queryName, value }) => {
            params.append(queryName, value);
        });
        
        setSearchParams(params);

    }, [selectedTags, isInitialized, setSearchParams]);

    return (
        <>
            <StyledFilterForm aria-label="필터링 선택 폼">
                {filterData.map(item => (
                    <StyledFieldset key={item.label}>
                        <legend className="sr-only">{item.label}</legend>
                        <span>{item.label}</span>

                        <StyledFilterList>
                            {item.options.map((option) => (
                                <StyledFilterItem key={option.value}>
                                    <label htmlFor={option.value}>
                                        <input
                                            id={option.value} 
                                            name={item.queryName}
                                            value={option.value}
                                            type="checkbox"
                                            onChange={handleCheck}
                                            checked={
                                                selectedTags.some(tag => tag.value === option.value)
                                            }
                                            />
                                        <span>{option.label}</span>
                                    </label>
                                </StyledFilterItem>
                            ))
                            }
                        </StyledFilterList>
                    </StyledFieldset>              
                ))}
            </StyledFilterForm>
            { hasTags && selectedTags.length > 0 &&
                <FilterTags
                    selectedTags={selectedTags} 
                    setSelectedTags={setSelectedTags}
                />          
            }
    </>
    )
}

export default FilterForm;