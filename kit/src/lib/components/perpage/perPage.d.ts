export interface PerPageProps {
  perPage: number;
  perPageOptions: number[];
  onPerPageChange: (newPerPage: number) => void;
}
