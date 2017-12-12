TEXSRC = $(wildcard ./*.tex)

paper: report.pdf

all: report.pdf

pdf: report.pdf

#report.pdf: biblio.bib $(TEXSRC)
report.pdf: $(TEXSRC)
	pdflatex report
	#bibtex report
	pdflatex report
	pdflatex report

clean: 
	\rm -f *.dvi *.aux *.ps *~ *.log *.blg *.bbl *.out report.pdf
