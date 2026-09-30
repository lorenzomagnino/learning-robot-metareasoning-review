# Learning Robot Metareasoning: Adaptive Computation Budgets for Real-Time Control
Icra2027

Edit each section in `sections/`: `hero.html` (title and video),
`abstract.html`, `method.html`, `semi-mdp.html`, `planner-statistics.html`, and `results.html`.
The shared layout and styles live in `page.html`; section order is set in `build.py`.

After editing, rebuild the static page:

```sh
python3 build.py
python3 build.py --check
```

Commit the updated `index.html` with the source files. It is the generated page
used by static hosting; edit the section files rather than `index.html` directly.

Results media: navigation, reactive drone, long-deliberation drone,
adaptive drone, and manipulation. Videos are resized to 1280px wide
and exported without audio; source playback speeds are preserved.
Plots reproduce paper Figures 4, 6, 7 and 9. The semi-MDP diagram is rendered
from `tikz/epoch_clock.tex`.

All displayed equations are authored in `assets/formulas/*.tex`, compiled to
PDF, and shown using PNG previews linked to the PDFs. After changing a formula,
run `sh build-formulas.sh` (requires LaTeX and Ghostscript), then `python3 build.py`.
The epoch diagram uses a CSS reveal animation with a pause checkbox and respects
the viewer's reduced-motion preference. Drone videos use their native aspect ratio
to avoid letterboxing.

Figure 6 layers the complete plot over an identical rendering with its three mean
curves hidden. Only the top layer reveals; axes, legend, uncertainty bands and
annotations remain visible in the background.
