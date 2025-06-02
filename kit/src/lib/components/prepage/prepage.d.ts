export interface PrePageProps {
  perPage: number;
  perPageOptions: number[];
  onPerPageChange: (newPerPage: number) => void;
}
