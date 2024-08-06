import { Button, Text } from "@chakra-ui/react";

export const RenderPagesNumbers = (
  currentPage,
  handlePageChange,
  totalPages
) => {
  const range = 2; // Number of page numbers to show before and after current page
  const buttons = [];

  // Always show the first page button
  buttons.push(
    <Button
      key={1}
      onClick={() => handlePageChange(1)}
      isDisabled={currentPage === 1}
      bg={currentPage === 1 ? "cyan.400" : "transparent"}
      _disabled={{ textColor: "black" }}
    >
      1
    </Button>
  );

  // Show dots if there are more than 2 pages between the first page and the current page
  if (currentPage > range + 2) {
    buttons.push(<Text key="dots-start">...</Text>);
  }

  // Show the previous page, current page, and next page
  const startPage = Math.max(2, currentPage - range);
  const endPage = Math.min(totalPages - 1, currentPage + range);

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => handlePageChange(i)}
        isDisabled={currentPage === i}
        bg={currentPage === i ? "cyan.400" : "transparent"}
        _disabled={{ textColor: "black" }}
      >
        {i}
      </Button>
    );
  }

  // Show dots if there are more than 2 pages between the last page and the current page
  if (currentPage < totalPages - range - 1) {
    buttons.push(<Text key="dots-end">...</Text>);
  }

  // Always show the last page button
  if (totalPages > 1) {
    buttons.push(
      <Button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        isDisabled={currentPage === totalPages}
        _disabled={{ textColor: "black" }}
        bg={currentPage === totalPages ? "cyan.400" : "transparent"}
      >
        {totalPages}
      </Button>
    );
  }

  return buttons;
};
