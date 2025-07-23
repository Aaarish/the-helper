package com.roya.the_helper.common;

public enum SearchFilter {
    PROFESSION(1),
    LOCALITY(2),
    NAME(3);

    private int filterId;

    SearchFilter(int filterId) {
        this.filterId = filterId;
    }
    public int getFilterId() {
        return filterId;
    }
}
