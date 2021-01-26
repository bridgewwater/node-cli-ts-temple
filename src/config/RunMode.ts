let is_verbose = false;

export const open_verbose = function () {
  is_verbose = true;
};

export const verbose = function () {
  return is_verbose;
};
